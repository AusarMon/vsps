package com.scut.vsp.code.codemodule.entity;

import org.jsoup.nodes.Document;

import java.util.Map;

/**
 * Created by sosoo on 2016/11/28.
 */
public class variableModule extends baseModule {
    private String name;

    private DataType dtype;

    public String getName() {
        return name;
    }

    public DataType getDtype() {
        return dtype;
    }

    public variableModule() {
    }
    public String appendToJavascript(String s){return s;}
    @Override
    protected void init(Map<String, Object> jsonMap) throws Exception {
        super.init(jsonMap);
        this.name = (String) jsonMap.get("name");
        this.dtype = DataType.StringMap.get(jsonMap.get("dtype"));
    }

    public Document modifyHtml(Document html) {
        return html;
    }
}
