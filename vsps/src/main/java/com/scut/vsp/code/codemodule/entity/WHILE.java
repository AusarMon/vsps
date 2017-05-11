package com.scut.vsp.code.codemodule.entity;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by sosoo on 2016/11/28.
 */

public class WHILE extends procedureModule {
    private String moduleType = "WHILE";
    private OPERATOR condition;
    private ArrayList<procedureModule> procedure = new ArrayList<>();

    public WHILE() {
    }

    @Override
    public void init(Map<String, Object> jsonMap) throws Exception {
        super.init(jsonMap);
        condition=new OPERATOR();
        condition.init((Map<String, Object>) jsonMap.get("condition"));
        ArrayList<Object> procedure_list = (ArrayList<Object>) jsonMap.get("procedure");
        for (Object procedureObject :
                procedure_list) {
            Map map = (HashMap) procedureObject;
            procedureModule oneProcedure = (procedureModule) context.getBean((String) map.get("moduleType"));
            oneProcedure.setContext(context);
            oneProcedure.init(map);
            procedure.add(oneProcedure);
        }
    }

    @Override
    public String generateJavascript() {
        try {
            //while(...){...}
            String javascriptCode = "";
            javascriptCode += "while(";
            String conditionCode = condition.generateJavascript();
            conditionCode = conditionCode.substring(0, conditionCode.length() - 2);
            javascriptCode+=conditionCode+")\n{\n";

            for (procedureModule module :
                    procedure) {
                javascriptCode+=module.generateJavascript();
            }
            javascriptCode+="}\n";
            return javascriptCode;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
