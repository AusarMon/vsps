package com.scut.vsp.code.evaluation;


import com.scut.vsp.code.evaluation.model.TestCase;
import com.scut.vsp.model.IOItem;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import javax.script.*;
import java.util.Objects;
import java.util.Set;

/**
 * Created by HL on 09/05/2017.
 */

@Component
public class Evaluator {

    private static Logger logger = Logger.getLogger(Evaluator.class);

    ScriptEngineManager manager = new ScriptEngineManager();
    private static final String ENGINE_NAME = "JavaScript";

    public boolean evaluate(String script, TestCase testCase, IOItem[] inputs, IOItem output) throws ScriptException {
        ScriptEngine engine = manager.getEngineByName(ENGINE_NAME);

        ScriptContext context = new SimpleScriptContext();
        Set<String> varNames = testCase.getInputs().keySet();
        logger.info("inputs");
        for (String var : varNames) {
            IOItem item = IOItem.getItemByName(var, inputs);
            Object object = IOItem.getObject(item, (String)testCase.getInputs().get(var));
            logger.info(var + ": " + object);
            context.setAttribute(var, object, ScriptContext.ENGINE_SCOPE);
        }
        logger.info("expect");
        Object expectObject = IOItem.getObject(output, (String) testCase.getExpect());
        logger.info(expectObject);

        Object result = engine.eval(script, context);
        logger.info("result: " + result);

        return result.equals(expectObject);
    }
}
