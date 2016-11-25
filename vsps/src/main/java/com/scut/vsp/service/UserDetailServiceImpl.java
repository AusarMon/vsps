package com.scut.vsp.service;

import com.scut.vsp.mapper.UserMapper;
import com.scut.vsp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Created by ASH on 2016/11/25.
 */

@Service
public class UserDetailServiceImpl implements UserDetailsService, UserService {

    @Autowired private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userMapper.findUserByUsername(username);
    }

    @Override
    public boolean passwordMatch(String username, String password) {
        User user = userMapper.findUserByUsername(username);
        return user.getPassword().equals(password);
    }

}
