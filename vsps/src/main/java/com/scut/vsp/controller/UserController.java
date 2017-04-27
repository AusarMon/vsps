package com.scut.vsp.controller;

import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;
import com.scut.vsp.config.security.model.UserContext;
import com.scut.vsp.exception.WrongPasswordException;
import com.scut.vsp.mapper.UserMapper;
import com.scut.vsp.model.User;
import com.scut.vsp.request.model.ModifyPswRequest;
import com.scut.vsp.response.model.Error;
import com.scut.vsp.response.model.Success;
import com.scut.vsp.service.UserService;
import com.scut.vsp.utils.PrincipalTransform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * Created by ASH on 2016/11/25.
 */

@RestController
@RequestMapping("v1/user")
public class UserController {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/reg", method = RequestMethod.PUT)
    public ResponseEntity<User> register(@RequestBody User user) throws MySQLIntegrityConstraintViolationException {
        userMapper.insert(user);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @ExceptionHandler(MySQLIntegrityConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error userExisted() {
        return new Error(HttpStatus.BAD_REQUEST.value(), "User existed");
    }

    @RequestMapping(value = "/psw", method = RequestMethod.POST)
    public ResponseEntity<Success> modifyPsw(@RequestBody ModifyPswRequest request, Principal principal)
            throws WrongPasswordException {
        UserContext userContext = PrincipalTransform.transform(principal);
        String username = userContext.getUsername();
        if (!userService.passwordMatch(username, request.getOldPassword())) {
            throw new WrongPasswordException("Old password does not match");
        }

        userMapper.modifyPasswordByUsername(username, request.getNewPassword());
        return new ResponseEntity<Success>(new Success(true), HttpStatus.OK);
    }

    @ExceptionHandler(WrongPasswordException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error wrongPassword(WrongPasswordException e) {
        return new Error(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    }
}
