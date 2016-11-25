package com.scut.vsp.mapper;

import com.scut.vsp.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

/**
 * Created by ASH on 2016/11/25.
 */

@Mapper
public interface UserMapper {

    final String USER_TABLE = "user";

    @Select("select * from " + USER_TABLE + " where username = #{username}")
    User findUserByUsername(@Param("username") String username);

    @Insert("insert into " + USER_TABLE
            + "(username, password, email) values(#{username}, #{password}, #{email})")
    long insert(User user);

    @Delete("delete from " + USER_TABLE + " where username = #{username}")
    void delete(@Param("username") String username);

    @Update("update " + USER_TABLE + " set password=#{new} where username=#{username}")
    void modifyPasswordByUsername(@Param("username") String username, @Param("new") String newPsw);
}
