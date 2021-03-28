package test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TestTxt {
    public static void main(String[] args) {
//        String path1 = "D:\\ssh\\txt\\txff.txt";
//        readTxt(path1,"txff");
        String path2 = "D:\\ssh\\txt\\henei.txt";
        readTxt(path2,"henei");
//        String path3 = "D:\\ssh\\txt\\syff.txt";
//        readTxt(path3,"syff");
    }

    public static void readTxt(String path,String name) {
        try {
            File file = new File(path);
            FileInputStream fileInputStream = new FileInputStream(file);
            InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream);
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            StringBuffer sb = new StringBuffer();
            List<String> list = new ArrayList<>();
            String text = null;
            while ((text = bufferedReader.readLine()) != null) {
                String txt = text.replace(" ", "").trim();
                if(txt.isEmpty()) continue;
                if (txt.length() == 4) txt = "0" + txt;
                if (txt.length() == 3) txt = "00" + txt;
                if (txt.length() == 2) txt = "000" + txt;
                if (txt.length() == 1) txt = "0000" + txt;
                list.add(txt);
            }
            Map<String,String> leftMap = new HashMap<>();
            for (int i = 0; i <= 9; i++) {
                for (int j = i + 1; j <= 9; j++) {
                    String key =  ""+i+""+j;
                    leftMap.put(key,key);
                }
            }
            for (int p = 1; p <= 3; p++) {
                System.out.println("【"+name+"】序列类型：" + p);
                for (int i = 0; i <= 9; i++) {
                    for (int j = i + 1; j <= 9; j++) {

                        boolean isFind = false;
                        int cnt = 1;
                        int num = 0;
                        int count = 0;
                        for (String txt : list) {
                            count++;
                            if (p == 1) txt = txt.substring(0, 3);
                            if (p == 2) txt = txt.substring(1, 4);
                            if (p == 3) {
                                txt = txt.substring(2, 5);
                            }
                            if (cnt == 1) {   /*kkkkkk*/
                                if (txt.contains("" + i) || txt.contains("" + j)) {
                                    cnt = 1;
                                } else {
                                    cnt = 2;
                                }
                            } else if (cnt == 2) {   /*kkkkkk*/
                                if (txt.contains("" + i) || txt.contains("" + j)) {
                                    cnt = 1;
                                } else {
                                    cnt = 3;
                                }
                            } else if (cnt == 3) {
                                if (txt.contains("" + i) || txt.contains("" + j)) {
                                    cnt = 4;
                                } else {
                                    cnt = 3;
                                }
                            } else if (cnt == 4) {
                                if (txt.contains("" + i) || txt.contains("" + j)) {
                                    cnt = 5;
                                } else {
                                    cnt = 3;
                                }
                            } else if (cnt == 5) {   /*kkkkkk*/
                                if (txt.contains("" + i) || txt.contains("" + j)) {
                                    cnt = 1;
                                } else {
                                    cnt = 6;
                                }
                            } else if (cnt == 6) {  /*kkkkkk*/
                                if (txt.contains("" + i) || txt.contains("" + j)) {
                                    cnt = 1;
                                } else {
                                    cnt = 7;
                                }
                            } else if (cnt == 7) {
                                if (txt.contains("" + i) || txt.contains("" + j)) {
                                    cnt = 8;
                                } else {
                                    cnt = 7;
                                }
                            } else if (cnt == 8) {
                                if (txt.contains("" + i) || txt.contains("" + j)) {
                                    cnt = 9;
                                } else {
                                    cnt = 7;
                                }
                            } else if (cnt == 9) {  /*kkkkkk*/
                                if (txt.contains("" + i) || txt.contains("" + j)) {
                                    cnt = 1;
                                } else {
                                    cnt = 10;
                                }
                            } else if (cnt == 10) {   /*kkkkkk*/
                                if (txt.contains("" + i) || txt.contains("" + j)) {
                                    cnt = 1;
                                } else {
                                    cnt = 11;
                                    num++;
                                }
                            } else if (cnt == 11) {
                                String vv =  ""+i+""+j;
                                if(leftMap.containsKey(vv))leftMap.remove(vv);
                                System.out.println("【"+name+"】序列【" + p + "】：顺序【" + count + "】第【"+num+"】个数字：" + i + " " + j);
                                cnt = 1;
                            }

                        }

                    }
                }
            }

            for(Map.Entry<String, String> entry : leftMap.entrySet()){
                String mapKey = entry.getKey();
                System.out.println(mapKey);
            }



        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
