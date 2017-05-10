package com.scut.vsp.mapper;

import com.scut.vsp.VspsApplication;
import com.scut.vsp.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

/**
 * Created by ASH on 2016/11/25.
 */

@RunWith(SpringRunner.class)
@SpringBootTest()
public class UserMapperTest {
    @Autowired UserMapper userMapper;

    @Test
    public void testFindUser() {
        User user = userMapper.findUserByUsername("test");
        User expect = new User("test", "test", "test", "user");
        assertEquals(expect, user);
    }

    @Test
    public void testInsert() {
        User newUser = new User("test1", "test1", "test1", "user");
        userMapper.insert(newUser);
        User user = userMapper.findUserByUsername(newUser.getUsername());
        assertEquals(newUser, user);
        userMapper.delete(newUser.getUsername());
    }

    @Test
    public void testModifyPswByUserName() {
        User expect = userMapper.findUserByUsername("test");
        String origin = expect.getPassword();
        expect.setPassword("new");
        userMapper.modifyPasswordByUsername(expect.getUsername(), expect.getPassword());
        User user = userMapper.findUserByUsername(expect.getUsername());
        assertEquals(expect, user);
        userMapper.modifyPasswordByUsername(expect.getUsername(), origin);
    }
}
