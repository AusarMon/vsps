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
                    @Result(column = "struct_info", property = "structInfo"),
                    @Result(column = "description", property = "description")
            }
    )
    Program findByUsername(@Param("username") String username);

    @Select("select * from " + PROGRAM_TABLE + " where program_id = #{id}")
    @ResultMap(value = "program")
    Program findById(@Param("id") String id);

    @Select("select program_id, name, description from " + PROGRAM_TABLE + " where username = #{username}")
    @Results(
            id = "programBasicInfo",
            value = {
                    @Result(column = "program_id", property = "programId"),
                    @Result(column = "name", property = "name"),
                    @Result(column = "description", property = "description")
            }
    )
    List<ProgramBasicInfo> findProgtamBasicInfoByUsername(@Param("username") String username);

    @Insert("insert into "
            + PROGRAM_TABLE
            + "(program_id, username, name, struct_info) values(#{programId}, #{username}, #{name}, #{structInfo})")
    Long insert(Program program);

    @Update("update " + PROGRAM_TABLE + " set name = #{name}, struct_info = #{structInfo}, description = #{description} where program_id = #{programId}")
    Long update(Program program);

    @Delete("delete from " + PROGRAM_TABLE + " where program_id = #{id}")
    Long deleteByProgramId(@Param("id") String id);
}
