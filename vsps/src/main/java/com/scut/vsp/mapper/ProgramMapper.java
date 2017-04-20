package com.scut.vsp.mapper;

import com.scut.vsp.model.Program;
import com.scut.vsp.response.model.ProgramBasicInfo;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;

import java.util.List;

/**
 * Created by ASH on 2016/11/25.
 */

@Mapper
public interface ProgramMapper {

    String PROGRAM_TABLE = "program";

    @Select("select * from " + PROGRAM_TABLE + " where username = #{username}")
    @Results(
            id = "program",
            value = {
                    @Result(column = "program_id", property = "programId"),
                    @Result(column = "username", property = "username"),
                    @Result(column = "name", property = "name"),
                    @Result(column = "struct_info", property = "structInfo")
            }
    )
    Program findByUsername(@Param("username") String username);

    @Select("select * from " + PROGRAM_TABLE + " where program_id = #{id}")
    @ResultMap(value = "program")
    Program findById(@Param("id") String id);

    @Select("select program_id, name from " + PROGRAM_TABLE + " where username = #{username}")
    @Results(value = {
            @Result(id = true, property = "programId", column = "program_id", javaType = String.class, jdbcType = JdbcType.VARCHAR),
            @Result(id = true, property = "name", column = "name", javaType = String.class, jdbcType = JdbcType.VARCHAR)
    })
    List<ProgramBasicInfo> findProgtamBasicInfoByUsername(@Param("username") String username);

    @Insert("insert into "
            + PROGRAM_TABLE
            + "(program_id, username, name, struct_info) values(#{programId}, #{username}, #{name}, #{structInfo})")
    Long insert(Program program);

    @Update("update " + PROGRAM_TABLE + " set name = #{name}, struct_info = #{structInfo} where program_id = #{programId}")
    Long update(Program program);

    @Delete("delete from " + PROGRAM_TABLE + " where program_id = #{id}")
    Long deleteByProgramId(@Param("id") String id);
}
