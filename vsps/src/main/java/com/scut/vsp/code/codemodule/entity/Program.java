package com.scut.vsp.code.codemodule.entity;

import org.springframework.context.ApplicationContext;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sosoo on 2016/11/28.
 */

public class Program {
    private ApplicationContext context;
    private String name;
    private List<variableModule> variableModules;
    private List<procedureModule> procedureModules;

    public Program(String name) {
        this.name = name;
        variableModules = new ArrayList<variableModule>();
        procedureModules = new ArrayList<procedureModule>();
    }

    public List<variableModule> getVariableModules() {
        return variableModules;
    }

    public void setVariableModules(List<Object> variableModules) throws Exception {
        for (Object object : variableModules) {
            Map map = (HashMap) object;
            String moduleTypeStr = (String) map.get("moduleType");
            variableModule variable = (variableModule) context.getBean(moduleTypeStr);
            variable.init(map);
            this.variableModules.add(variable);
        }
    }

    public List<procedureModule> getProcedureModules() {
        return procedureModules;
    }

    public void setProcedureModules(List<Object> procedureModules) throws Exception {
        for (Object object : procedureModules) {
            Map map = (HashMap) object;
            String moduleTypeStr = (String) map.get("moduleType");
            procedureModule procedure = (procedureModule) context.getBean(moduleTypeStr);
            procedure.setContext(context);
            procedure.init(map);
            this.procedureModules.add(procedure);
        }
    }

    public void setContext(ApplicationContext context) {
        this.context = context;
    }

    public String getName() {
        return name;
    }
}
