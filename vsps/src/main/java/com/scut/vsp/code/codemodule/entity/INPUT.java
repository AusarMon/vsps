package com.scut.vsp.code.codemodule.entity;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Tag;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Created by sosoo on 2016/11/28.
 */

public class INPUT extends variableModule {
    private String moduleType = "INPUT";
    private String desc;
    public String getDesc() {
        return desc;
    }
    public INPUT(){}
    @Override
    public void init(Map<String, Object> jsonMap){
        super.init(jsonMap);
        this.desc= (String) jsonMap.get("desc");
    }

    @Override
    public Document modifyHtml(Document html) {
        Element div = new Element(Tag.valueOf("div"),"");
        div.attr("class","form-control");
        Element label =new Element(Tag.valueOf("label"),"");
        label.attr("for",this.getId());
        label.html(this.getDesc());
        Element input=new Element(Tag.valueOf("input"),"");
        input.attr("id",this.getId());
        input.attr("type","text");
        div.appendChild(label);
        div.appendChild(new Element(Tag.valueOf("br"),""));
        div.appendChild(input);
        html.body().appendChild(div);
        return html;
    }

    @Override
    public String generateJavascript() {
        StringBuilder str=new StringBuilder("var "+this.getName()+"=document.getElementById(\""+this.getId()+"\").value;\n") ;
        if (getDtype()==DataType.NumberType)
            str.append(this.getName()+"=parseFloat("+getName()+");\n");
        return str.toString();

    }
}
