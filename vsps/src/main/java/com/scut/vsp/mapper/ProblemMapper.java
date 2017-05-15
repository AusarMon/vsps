package com.scut.vsp.mapper;

import com.scut.vsp.model.Problem;
import com.scut.vsp.request.model.ModifyProblemRequest;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * Created by HL on 09/05/2017.
 */

@Mapper
public interface ProblemMapper {
    String PROBLEM_TABLE = "problem";

    @Insert("insert into " + PROBLEM_TABLE +
            " (id, name, description, input, output, state, struct_info, test_cases) " +
            "values (#{id}, #{name}, #{description}, #{input}, #{output}, #{state}, #{structInfo}, #{testCases})")
    Long insert(Problem problem);

    @Delete("delete from " + PROBLEM_TABLE +
    " where id=#{id}")
    Long delete(@Param("id") String id);

    @Select("select * from " + PROBLEM_TABLE + " where id=#{id}")
    @Results(
            id = "Problem",
            value = {
                    @Result(column = "id", property = "id"),
                    @Result(column = "name", property = "name"),
                    @Result(column = "description", property = "description"),
                    @Result(column = "input", property = "input"),
                    @Result(column = "output", property = "output"),
                    @Result(column = "state", property = "state"),
                    @Result(column = "struct_info", property = "structInfo"),
                    @Result(column = "test_cases", property = "testCases"),
            }
    )
    Problem getProblem(String id);

    @Select("select * from " + PROBLEM_TABLE)
    @ResultMap("Problem")
    List<Problem> getAllProbelm();

    @Update("update " + PROBLEM_TABLE + " set name=#{name}, description=#{description}, state=#{state}, testCases=#{testCases} where id=#{id}")
    Long modify(Problem problem);

    @Select("select * from " + PROBLEM_TABLE + " where state != 0")
    @ResultMap("Problem")
    List<Problem> getAllPublishedProblem();
}
