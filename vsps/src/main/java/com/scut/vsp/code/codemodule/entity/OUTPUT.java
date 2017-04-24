package com.scut.vsp.code.codemodule.entity;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Tag;

import java.util.Map;

/**
 * Created by sosoo on 2016/11/28.
 */

public class OUTPUT extends variableModule {
    private String desc;

    public String getDesc() {
        return desc;
    }

    public OUTPUT() {
    }

    @Override
    public void init(Map<String, Object> jsonMap) {
        super.init(jsonMap);
        this.desc = (String) jsonMap.get("desc");
    }

    @Override
    public Document modifyHtml(Document html) {
        Element div = new Element(Tag.valueOf("div"),"");
        Element label =new Element(Tag.valueOf("p"),"");
        label.html(this.getDesc());
        Element input=new Element(Tag.valueOf("p"),"");
        input.attr("id",this.getId());
        input.attr("type","text");
        div.appendChild(label);
        div.appendChild(input);
        html.body().appendChild(div);
        return html;
    }
    @Override
    public String appendToJavascript(String s){
        return s+"document.getElementById(\""+getId()+"\").innerHTML="+getName()+";";
    }
    @Override
    public String generateJavascript(){
        return "var "+this.getName()+";\n";
    }
}
