package com.scut.vsp.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.scut.vsp.code.evaluation.Evaluator;
import com.scut.vsp.code.evaluation.model.EvaluationResult;
import com.scut.vsp.code.evaluation.model.TestCase;
import com.scut.vsp.mapper.ProblemMapper;
import com.scut.vsp.mapper.SolutionMapper;
import com.scut.vsp.model.IOItem;
import com.scut.vsp.model.Problem;
import com.scut.vsp.model.Solution;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.script.ScriptException;
import java.io.IOException;

/**
 * Created by HL on 09/05/2017.
 */

@Service
public class EvaluationServiceProvider implements EvaluationServiceProviderInterface {

    @Autowired
    Evaluator evaluator;

    @Autowired
    CodeGeneraService codeGeneraService;

    @Autowired
    SolutionMapper solutionMapper;

    @Autowired
    ProblemMapper problemMapper;

    static Gson gson;

    private static final Logger logger = Logger.getLogger(EvaluationServiceProvider.class);

    static {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gson = gsonBuilder.setPrettyPrinting().create();
    }

    @Override
    public EvaluationResult evaluate(Solution solution) {

        // 1. 根据用户代码 id 获取用户代码结构并生成代码
        String structJson = solution.getStructInfo();
        String script = null;
        try {
            script = codeGeneraService.generateTestCode(structJson);
            System.out.println(script);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 2. 根据问题 id 获取测试集
        Problem problem = problemMapper.getProblem(solution.getProblemId());
        IOItem[] inputs = gson.fromJson(problem.getInput(), IOItem[].class);
        IOItem output = gson.fromJson(problem.getOutput(), IOItem.class);
        TestCase[] testCases = gson.fromJson(problem.getTestCases(), TestCase[].class);

        // 3. 开始测试
        double pass = 0;
        boolean exception = false;
        String err = "";
        for (TestCase c : testCases) {
            try {
                boolean result = evaluator.evaluate(script, c, inputs, output);
                logger.info(result);
                pass = result? pass + 1 : pass;
            } catch (ScriptException e) {
                e.printStackTrace();
                exception = true;
                err = e.getMessage();
                break;
            }
        }

        double passRate = (pass / testCases.length) * 100;
        EvaluationResult result = new EvaluationResult();
        if (exception) {
            logger.info("执行异常");
            result.setState(EvaluationResult.FAIL);
            result.setErr(err);
        } else {
            result.setPassRate(passRate);
            result.setState((passRate == 100.0? EvaluationResult.ACCEPT : EvaluationResult.FAIL));
        }

        // 4.将 Result 的结果写入用户解决方案的数据中
        solution.setState(result.getState());
        solution.setPassRate(passRate);
        solutionMapper.update(solution);

        return result;
    }
}
