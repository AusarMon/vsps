package com.scut.vsp.code.codemodule.entity;

import com.scut.vsp.exception.ProgramInvalidException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by sosoo on 2016/11/28.
 */

public class IF extends procedureModule {
    private String moduleType = "IF";
    private OPERATOR false_condition;
    private OPERATOR true_condition;
    private ArrayList<procedureModule> true_procedure = new ArrayList<>();
    private ArrayList<procedureModule> false_procedure = new ArrayList<>();


    public IF() {
    }

    @Override
    public void init(Map<String, Object> jsonMap) throws Exception {
        super.init(jsonMap);
        this.true_condition = new OPERATOR();
        true_condition.init((Map<String, Object>) jsonMap.get("condition"));
        ArrayList<Object> true_procedure_list = (ArrayList<Object>) jsonMap.get("procedure");
        for (Object true_procedure_map :
                true_procedure_list) {
            Map map = (HashMap) true_procedure_map;
            procedureModule oneProcedure = (procedureModule) context.getBean((String) map.get("moduleType"));
            oneProcedure.setContext(context);
            oneProcedure.init(map);
            true_procedure.add(oneProcedure);
        }
        if (jsonMap.containsKey("false_condition")) {
            this.false_condition = new OPERATOR();
            false_condition.init((Map<String, Object>) jsonMap.get("false_condition"));
        }
        if (jsonMap.containsKey("false_procedure")) {
            ArrayList<Object> false_procedure_list = (ArrayList<Object>) jsonMap.get("false_procedure");
            for (Object false_procedure_map :
                    false_procedure_list) {
                Map map = (HashMap) false_procedure_map;
                procedureModule oneProcedure = (procedureModule) context.getBean((String) map.get("moduleType"));
                oneProcedure.setContext(context);
                oneProcedure.init(map);
                false_procedure.add(oneProcedure);
            }
        }
    }

    @Override
    public String generateJavascript() {
        try {
            //if(){..}
            String javaScriptCode = "if(";
            if (true_condition != null) {
                String true_condition_code = true_condition.generateJavascript();
                true_condition_code = true_condition_code.substring(0, true_condition_code.length() - 2);
                javaScriptCode += true_condition_code + ")\n{\n";
            }
            for (procedureModule module :
                    true_procedure) {
                javaScriptCode += module.generateJavascript();
            }
            javaScriptCode += "}\n";
            //else
            if (!false_procedure.isEmpty()) {
                javaScriptCode += "else";
                //if()
                if (false_condition != null) {
                    String false_condition_code = false_condition.generateJavascript();
                    false_condition_code = false_condition_code.substring(0, false_condition_code.length() - 2);
                    javaScriptCode += " if(" + false_condition_code + ")";
                }
                //{...}
                javaScriptCode += "\n{";
                for (procedureModule module :
                        false_procedure) {
                    javaScriptCode += module.generateJavascript();
                }
                javaScriptCode += "}\n";
            }
            return javaScriptCode;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
