package com.scut.vsp.mapper;

import com.scut.vsp.model.Solution;
import org.apache.ibatis.annotations.*;

/**
 * Created by HL on 09/05/2017.
 */

@Mapper
public interface SolutionMapper {
    String SOLUTION_TABLE = "solution";

    @Insert("insert into " + SOLUTION_TABLE + " (problem_id, user_id, state, pass_rate, struct_info) " +
            "values(#{problemId}, #{userId}, #{state}, #{passRate}, #{structInfo})")
    Long insert(Solution up);

    @Select("select * from " + SOLUTION_TABLE + " where problem_id=#{pid} and user_id=#{uid}")
    @Results(
            id = "Solution",
            value = {
                    @Result(column = "problem_id", property = "problemId"),
                    @Result(column = "user_id", property = "userId"),
                    @Result(column = "state", property = "state"),
                    @Result(column = "pass_rate", property = "passRate"),
                    @Result(column = "struct_info", property = "structInfo"),
            }
    )
    Solution get(@Param("pid") String pid, @Param("uid") String uid);

    @Update("update " + SOLUTION_TABLE + " set struct_info=#{structInfo}, state=#{state}, pass_rate=#{passRate} where " +
            "problem_id=#{problemId} and user_id=#{userId}")
    Long update(Solution solution);
}
