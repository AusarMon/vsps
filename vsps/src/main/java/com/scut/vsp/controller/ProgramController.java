package com.scut.vsp.controller;

import com.scut.vsp.config.security.model.UserContext;
import com.scut.vsp.exception.FieldLackException;
import com.scut.vsp.exception.ProgramNotFoundException;
import com.scut.vsp.mapper.ProgramMapper;
import com.scut.vsp.model.Program;
import com.scut.vsp.request.model.NewProgramRequest;
import com.scut.vsp.response.model.Error;
import com.scut.vsp.response.model.ProgramBasicInfo;
import com.scut.vsp.utils.PrincipalTransform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

/**
 * Created by ASH on 2016/11/25.
 */

@RestController
@RequestMapping("/v1/program")
public class ProgramController {

    @Autowired ProgramMapper programMapper;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    List<ProgramBasicInfo> findAllBasicInfo(Principal principal) {
        UserContext userContext = PrincipalTransform.transform(principal);
        String username = userContext.getUsername();
        List<ProgramBasicInfo> infoList = programMapper.findProgtamBasicInfoByUsername(username);

        return infoList;
    }

    @RequestMapping(value = "/detail/{id}", method = RequestMethod.GET)
    Program getDetail(@PathVariable String id) throws ProgramNotFoundException {
        Program program = programMapper.findById(id);

        if (program == null) {
            throw new ProgramNotFoundException(id);
        }

        return program;
    }

    @ExceptionHandler(ProgramNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Error programNotFound(ProgramNotFoundException e) {
        String programId = e.getId();
        Error error = new Error(HttpStatus.NOT_FOUND.value(), "Program [" + programId + "] not found");
        return error;
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public ResponseEntity<Program> addProgram(@RequestBody NewProgramRequest request, Principal principal) {
        UserContext userContext = PrincipalTransform.transform(principal);
        String username = userContext.getUsername();
        String id = UUID.randomUUID().toString();
        Program program = new Program(id, username, request.getName(), request.getStructInfo());
        programMapper.insert(program);

        return new ResponseEntity<>(program, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<Program> modifyName(@RequestBody Program program)
            throws FieldLackException {
        programMapper.update(program);

        return new ResponseEntity<>(program, HttpStatus.OK);
    }
}
