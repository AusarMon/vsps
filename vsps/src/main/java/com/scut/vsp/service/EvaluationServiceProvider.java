package com.scut.vsp.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.scut.vsp.code.evaluation.Evaluator;
import com.scut.vsp.code.evaluation.model.EvaluationResult;
import com.scut.vsp.code.evaluation.model.TestCase;
import com.scut.vsp.mapper.ProblemMapper;
import com.scut.vsp.mapper.SolutionMapper;
import com.scut.vsp.model.Problem;
import com.scut.vsp.model.Solution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.script.ScriptException;

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

    static {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gson = gsonBuilder.setPrettyPrinting().create();
    }

    @Override
    public EvaluationResult evaluate(Solution solution) {

        // 1. 根据用户代码 id 获取用户代码结构并生成代码
        String structJson = solution.getStructInfo();
        String script = codeGeneraService.generateCode(structJson);

        // 2. 根据问题 id 获取测试集
        Problem problem = problemMapper.getProblem(solution.getProblemId());
        TestCase[] testCases = gson.fromJson(problem.getTestCases(), TestCase[].class);

        // 3. 开始测试
        double pass = 0;
        boolean exception = false;
        String err = "";
        for (TestCase c : testCases) {
            try {
                boolean result = evaluator.evaluate(script, c);
                pass = result? pass + 1 : pass;
            } catch (ScriptException e) {
                exception = true;
                err = e.getMessage();
                break;
            }
        }

        EvaluationResult result = new EvaluationResult();
        if (exception) {
            result.setState(EvaluationResult.EXCEPTION);
            result.setErr(err);
        } else {
            double passRate = (pass / testCases.length) * 100;
            result.setPassRate(passRate);
            result.setState((passRate == 100.0? EvaluationResult.SUCCESS : EvaluationResult.FIAL));
        }

        // 4.将 Result 的结果写入用户解决方案的数据中
        if (solution.getState() != Solution.ACCEPT) {
            if (pass == 100.0) {
                solution.setState(Solution.ACCEPT);
            } else if (err.length() > 0) {
                solution.setState(Solution.FAIL);
            } else {
                solution.setState(Solution.FAIL);
                double originPass = solution.getPassRate();
                solution.setPassRate((pass > originPass? pass : originPass));
            }

            solutionMapper.update(solution);
        }

        return result;
    }
}
