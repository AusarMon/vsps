package com.scut.vsp.model;

import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by HL on 10/05/2017.
 */
public class IOItem {
    String name;
    String dtype;
    String desc;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDtype() {
        return dtype;
    }

    public void setDtype(String dtype) {
        this.dtype = dtype;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public static IOItem getItemByName(String name, IOItem[] items) {
        for (IOItem item : items) {
            if (name.equals(item.getName())) {
                return item;
            }
        }

        return null;
    }

    public static Object getObject(IOItem item, String val) {
        switch (item.getDtype()) {
            case "number":
                return Double.parseDouble(val);
            case "list":
                String[] numbers = StringUtils.split(val, ',');
                List<Double> res = new ArrayList<>(numbers.length);
                for (String i : numbers) {
                    res.add(Double.parseDouble(i));
                }
                return res;
            case "boolean":
                return Boolean.parseBoolean(val);
        }

        // never be there
        return null;
    }
}
