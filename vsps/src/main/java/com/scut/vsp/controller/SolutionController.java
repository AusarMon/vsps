package com.scut.vsp.controller;

import com.scut.vsp.code.evaluation.model.EvaluationResult;
import com.scut.vsp.config.security.model.UserContext;
import com.scut.vsp.exception.ItemNotFoundException;
import com.scut.vsp.mapper.ProblemMapper;
import com.scut.vsp.mapper.SolutionMapper;
import com.scut.vsp.model.Problem;
import com.scut.vsp.model.Solution;
import com.scut.vsp.request.model.SolutionRequest;
import com.scut.vsp.response.model.Error;
import com.scut.vsp.service.EvaluationService;
import com.scut.vsp.utils.PrincipalTransform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * Created by HL on 10/05/2017.
 */

@RestController
@RequestMapping("v1/sol")
public class SolutionController {
    @Autowired
    SolutionMapper solutionMapper;
    @Autowired
    EvaluationService evaluationService;
    @Autowired
    ProblemMapper problemMapper;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    ResponseEntity<Solution> addSolution(@RequestBody SolutionRequest request, Principal principal) throws ItemNotFoundException {
        Problem problem = problemMapper.getProblem(request.getId());
        if (problem == null) {
            throw new ItemNotFoundException(request.getId());
        }

        UserContext userContext = PrincipalTransform.transform(principal);
        String username = userContext.getUsername();
        Solution solution = solutionMapper.get(request.getId(), username);

        boolean exist = true;
        if (solution == null) {
            exist = false;
            solution = new Solution();
            solution.setProblemId(request.getId());
            solution.setUserId(username);
            solution.setPassRate(0.0);
            solution.setState(0);
        }

        solution.setStructInfo(request.getStructInfo());

        if (exist) {
            solutionMapper.update(solution);
        } else {
            solutionMapper.insert(solution);
        }

        return new ResponseEntity<Solution>(solution, HttpStatus.OK);
    }

    @RequestMapping(value = "/eval/{pid}", method = RequestMethod.GET)
    ResponseEntity<EvaluationResult> evaluate(@PathVariable String pid, Principal principal) throws ItemNotFoundException {
        UserContext userContext = PrincipalTransform.transform(principal);
        String username = userContext.getUsername();

        Problem problem = problemMapper.getProblem(pid);
        Solution solution = solutionMapper.get(pid, username);
        if (problem == null) {
            throw new ItemNotFoundException("Problem [" + pid);
        }
        if (solution == null) {
            throw new ItemNotFoundException("Solution [" + username);
        }
        if (problem.getState() != Problem.OEPN) {
            throw new IllegalStateException();
        }

        EvaluationResult result = evaluationService.evaluate(solution);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ExceptionHandler(ItemNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Error problemNotFound(ItemNotFoundException e) {
        String id = e.getId();
        Error error = new Error(HttpStatus.NOT_FOUND.value(), id + "] not found");
        return error;
    }

    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error illegalState(IllegalStateException e) {
        Error error = new Error(HttpStatus.BAD_REQUEST.value(), "Problem already closed.");
        return error;
    }

}
