package com.scut.vsp.service;

import com.scut.vsp.code.codemodule.entity.*;
import org.apache.commons.lang3.StringEscapeUtils;
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
            String name="code";
            if (jsonMap.get("name")!=null)
                 name = (String) jsonMap.get("name");
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
           System.out.println(jsonString);
            Document html = ReadHtmlTemplate();
            Program program = parseJSON(jsonString);
            if (program.getName()!=null)
                html.title(program.getName());
            ArrayList<variableModule> variableModules = (ArrayList<variableModule>) program.getVariableModules();
           for (variableModule module :
                   variableModules) {
               if(module.getClass()== INPUT.class)
                   html = module.modifyHtml(html);
           }
            for (variableModule module :
                    variableModules) {
                if(module.getClass()!= INPUT.class)
                    html = module.modifyHtml(html);
            }

            //add javascript code

            String javaScriptCode = "";
            javaScriptCode += "function myFunction()\n{\n";
            if (!variableModules.isEmpty()) {
                for (variableModule module :
                        variableModules) {
                    if(module.getClass()!= INPUT.class)
                        javaScriptCode += module.generateJavascript();
                }
                for (variableModule module :
                        variableModules) {
                    if(module.getClass()== INPUT.class)
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
           for (variableModule module :
                   variableModules) {
               if(module.getClass()== OUTPUT.class)
                   javaScriptCode=module.appendToJavascript(javaScriptCode);
           }
            javaScriptCode += "}";
            //put codes into html

            Element btn=new Element(Tag.valueOf("button"),"");
            btn.attr("id","mybtn");
            btn.text("运行");
            html.body().appendChild(btn);

           Element scriptNode=new Element(Tag.valueOf("script"),"");
           scriptNode.attr("id","func");
           scriptNode.text(javaScriptCode);
           html.body().appendChild(scriptNode);

           Element bindingNode=new Element(Tag.valueOf("script"),"");
           bindingNode.text("var btn = document.getElementById(\"mybtn\");\n" +
                   "    btn.addEventListener('click', myFunction);");
           html.body().appendChild(bindingNode);
            return  StringEscapeUtils.unescapeHtml4(StringEscapeUtils.unescapeHtml4(html.html())).replaceAll("\\\\","");
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
