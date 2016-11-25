package com.scut.vsp.controller;

import com.scut.vsp.config.security.config.JwtSettings;
import com.scut.vsp.config.security.exceptions.InvalidJwtToken;
import com.scut.vsp.config.security.model.UserContext;
import com.scut.vsp.config.security.token.AccessJwtToken;
import com.scut.vsp.config.security.token.JwtToken;
import com.scut.vsp.config.security.token.JwtTokenFactory;
import com.scut.vsp.exception.FieldLackException;
import com.scut.vsp.response.model.Error;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by ASH on 2016/11/26.
 */

@RestController
@RequestMapping("v1/auth/token")
public class AuthController {

    @Autowired JwtTokenFactory tokenFactory;
    @Autowired JwtSettings jwtSettings;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<Map<String, String>> refresh(@RequestBody Map<String, String> request)
            throws Exception{
        String token = request.get("refreshToken");

        if (token == null) {
            throw new FieldLackException("refreshToken");
        }

        Jws<Claims> jwsClaims = null;
        try {
            jwsClaims = Jwts.parser().setSigningKey(jwtSettings.getTokenSigningKey()).parseClaimsJws(token);
        } catch (UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException e) {
            throw new InvalidJwtToken();
        }

        String subject = jwsClaims.getBody().getSubject();
        List<String> scopes = jwsClaims.getBody().get("scope", List.class);
        List<GrantedAuthority> authorities = scopes.stream()
                .map(authority -> new SimpleGrantedAuthority(authority))
                .collect(Collectors.toList());

        UserContext userContext = UserContext.create(subject, authorities);
        AccessJwtToken newToken = tokenFactory.createAccessJwtToken(userContext);
        JwtToken newRefreshToken = tokenFactory.createRefreshToken(userContext);

        Map<String, String> result = new HashMap<>();
        result.put("token", newToken.getToken());
        result.put("refreshToken", newRefreshToken.getToken());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error tokenExpired(ExpiredJwtException e) {
        return new Error(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    }

    @ExceptionHandler(InvalidJwtToken.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error tokenExpired(InvalidJwtToken e) {
        return new Error(HttpStatus.BAD_REQUEST.value(), "Invalid refresh token");
    }

    @ExceptionHandler(FieldLackException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error fieldLack(FieldLackException e) {
        return new Error(HttpStatus.BAD_REQUEST.value(), "Lack of [" + e.getLackField() + "] filed.");
    }
}
