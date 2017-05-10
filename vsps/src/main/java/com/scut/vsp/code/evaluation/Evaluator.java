package com.scut.vsp.code.evaluation;


import com.scut.vsp.code.evaluation.model.TestCase;
import org.springframework.stereotype.Component;

import javax.script.*;
import java.util.Set;

/**
 * Created by HL on 09/05/2017.
 */

@Component
public class Evaluator {

    ScriptEngineManager manager = new ScriptEngineManager();
    private static final String ENGINE_NAME = "JavaScript";

    public boolean evaluate(String script, TestCase testCase) throws ScriptException {
        ScriptEngine engine = manager.getEngineByName(ENGINE_NAME);

        ScriptContext context = new SimpleScriptContext();
        Set<String> varNames = testCase.getInputs().keySet();
        for (String var : varNames) {
            context.setAttribute(var, testCase.getInputs().get(var), ScriptContext.ENGINE_SCOPE);
        }

        Object result = engine.eval(script, context);

        return result.equals(testCase.getExepct());
    }
}
