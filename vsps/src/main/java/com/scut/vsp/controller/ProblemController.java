package com.scut.vsp.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.scut.vsp.config.security.model.UserContext;
import com.scut.vsp.exception.ItemNotFoundException;
import com.scut.vsp.mapper.ProblemMapper;
import com.scut.vsp.mapper.SolutionMapper;
import com.scut.vsp.model.Problem;
import com.scut.vsp.model.Solution;
import com.scut.vsp.request.model.ModifyProblemRequest;
import com.scut.vsp.request.model.NewProblemRequest;
import com.scut.vsp.response.model.Error;
import com.scut.vsp.response.model.ProblemForUser;
import com.scut.vsp.response.model.ProblemResponse;
import com.scut.vsp.response.model.Success;
import com.scut.vsp.utils.PrincipalTransform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

/**
 * Created by HL on 10/05/2017.
 */

@RestController
@RequestMapping("v1/problem")
public class ProblemController {
    @Autowired
    ProblemMapper problemMapper;

    @Autowired
    SolutionMapper solutionMapper;

    static Gson gson;

    static {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gson = gsonBuilder.setPrettyPrinting().create();
    }

    void roleCheck(Principal principal) throws IllegalAccessException {
        UserContext userContext = PrincipalTransform.transform(principal);
        Collection<? extends GrantedAuthority> authorities = userContext.getAuthorities();
        boolean pass = false;
        for (GrantedAuthority authority : authorities) {
            if (authority.getAuthority().equals("ROLE_PUB")) {
                pass = true;
                break;
            }
        }
        if (!pass) {
            throw new IllegalAccessException();
        }
    }

    @RequestMapping(value = "/admin", method = RequestMethod.PUT)
    ResponseEntity<ProblemResponse> addProblem(@RequestBody NewProblemRequest request, Principal principal) throws IllegalAccessException {
        roleCheck(principal);

        Problem problem = new Problem();
        problem.setId(UUID.randomUUID().toString());
        problem.setName(request.getName());
        problem.setDescription(request.getDescription());
        problem.setState(0);
        problem.setInput(gson.toJson(request.getInputs()));
        problem.setOutput(gson.toJson(request.getOutput()));
        problem.setTestCases(gson.toJson(request.getTestCases()));
        problem.setStructInfo(request.getStructInfo());

        problemMapper.insert(problem);

        return new ResponseEntity<>(new ProblemResponse(problem), HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Success> deleteProblem(@PathVariable String id, Principal principal) throws IllegalAccessException {
        roleCheck(principal);

        long delNum = problemMapper.delete(id);
        boolean flag = (delNum == 0? false : true);
        HttpStatus status = (delNum == 0 ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
        Success res = new Success(flag);

        return new ResponseEntity<>(res, status);
    }

    @RequestMapping(value = "/admin/{id}", method = RequestMethod.GET)
    ResponseEntity<ProblemResponse> getProblem_admin(@PathVariable String id, Principal principal) throws ItemNotFoundException, IllegalAccessException {
        roleCheck(principal);
        Problem problem = problemMapper.getProblem(id);
        if (problem == null) {
            throw new ItemNotFoundException(id);
        }

        return new ResponseEntity<>(new ProblemResponse(problem), HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/all", method = RequestMethod.GET)
    List<ProblemResponse> getAll_admin(Principal principal) throws IllegalAccessException {
        roleCheck(principal);
        List<Problem> problems = problemMapper.getAllProbelm();
        List<ProblemResponse> res = new ArrayList<>();
        for (Problem p : problems) {
            res.add(new ProblemResponse(p));
        }

        return res;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    ResponseEntity<ProblemForUser> getProblem(@PathVariable String id, Principal principal) throws ItemNotFoundException {
        String uid = PrincipalTransform.transform(principal).getUsername();
        Solution solution = solutionMapper.get(id, uid);
        Problem problem = problemMapper.getProblem(id);
        if (problem == null) {
            throw new ItemNotFoundException(id);
        }

        return new ResponseEntity<>(new ProblemForUser(solution, problem), HttpStatus.OK);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    ResponseEntity<List<ProblemForUser>> getAll(Principal principal) {
        String uid = PrincipalTransform.transform(principal).getUsername();
        List<Problem> published = problemMapper.getAllPublishedProblem();
        List<ProblemForUser> results = new ArrayList<>();
        for (Problem problem : published) {
            results.add(new ProblemForUser(solutionMapper.get(problem.getId(), uid), problem));
        }

        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin", method = RequestMethod.POST)
    ResponseEntity<ProblemResponse> modify(@RequestBody ModifyProblemRequest request, Principal principal) throws IllegalAccessException {
        roleCheck(principal);

        Problem problem = problemMapper.getProblem(request.getId());
        problem.setName(request.getName());
        problem.setDescription(request.getDescription());
        problem.setState(request.getState());
        problem.setTestCases(gson.toJson(request.getTestCases()));
        problemMapper.modify(problem);

        return new ResponseEntity<>(new ProblemResponse(problem), HttpStatus.OK);
    }



    @ExceptionHandler(ItemNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Error problemNotFound(ItemNotFoundException e) {
        String programId = e.getId();
        Error error = new Error(HttpStatus.NOT_FOUND.value(), "Problem [" + programId + "] not found");
        return error;
    }

    @ExceptionHandler(IllegalAccessException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error illegalAccess(IllegalAccessException e) {
        Error error = new Error(HttpStatus.BAD_REQUEST.value(),"Access denied.");
        return error;
    }
}
