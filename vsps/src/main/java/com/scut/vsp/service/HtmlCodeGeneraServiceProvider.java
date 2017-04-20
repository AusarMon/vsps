package com.scut.vsp.service;

import com.scut.vsp.code.codemodule.entity.Program;
import com.scut.vsp.code.codemodule.entity.procedureModule;
import com.scut.vsp.code.codemodule.entity.variableModule;
import org.codehaus.jackson.map.ObjectMapper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created by sosoo on 2017/2/27.
 */

public class HtmlCodeGeneraServiceProvider implements CodeGeneraServiceProviderInterface {

    private String moduleBeansPath;
    private String HtmlTemplatePath;
    @Autowired
    private ApplicationContext context;

    private Document ReadHtmlTemplate() throws IOException {
        try {
            File html_file = new File(HtmlTemplatePath);
            return Jsoup.parse(html_file, "UTF-8");
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    private Program parseJSON(String jsonString) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> jsonMap = mapper.readValue(jsonString, Map.class);
            ArrayList<Object> variableModules = (ArrayList<Object>) jsonMap.get("variableArea");
            ArrayList<Object> procedureModules = (ArrayList<Object>) jsonMap.get("procedureArea");
            String name = (String) jsonMap.get("name");
            Program program = new Program(name);
            program.setContext(context);
            program.setVariableModules(variableModules);
            program.setProcedureModules(procedureModules);
            return program;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String generateCode(String jsonString) {
        try {
            //modify html
            Document html = ReadHtmlTemplate();
            Program program = parseJSON(jsonString);
            html.title(program.getName());
            ArrayList<variableModule> variableModules = (ArrayList<variableModule>) program.getVariableModules();
            for (variableModule module :
                    variableModules) {
                html = module.modifyHtml(html);
            }
            //add javascript code
            Element scriptNode = new Element(Tag.valueOf("script"), "");
            String javaScriptCode = scriptNode.html();
            javaScriptCode += "function myFunction()\n{\n";
            if (!variableModules.isEmpty()) {
                for (variableModule module :
                        variableModules) {
                    javaScriptCode += module.generateJavascript();
                }
            }
            ArrayList<procedureModule> procedureModules = (ArrayList<procedureModule>) program.getProcedureModules();
            if (!procedureModules.isEmpty()) {
                for (procedureModule module :
                        procedureModules) {
                    javaScriptCode += module.generateJavascript();
                }
            }
            javaScriptCode += "}";
            //put codes into html
            scriptNode.html(javaScriptCode);
            html.head().appendChild(scriptNode);
            return html.html();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public void setModuleBeansPath(String moduleBeansPath) {
        this.moduleBeansPath = moduleBeansPath;
        this.context = new ClassPathXmlApplicationContext(moduleBeansPath);
    }

    public void setHtmlTemplatePath(String htmlTemplatePath) {
        this.HtmlTemplatePath = htmlTemplatePath;
    }

//    public void setOperationConfigPath(String operationConfigPath) {
//        this.operationConfigPath = operationConfigPath;
//    }
}
