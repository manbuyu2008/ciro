package cc.water.ciro.system.query;

import cc.water.ciro.common.query.BaseQuery;

import java.util.List;

public class SscNumberQuery extends BaseQuery{
    private int note1;

    private List<Integer> note1s;

    private int note2;

    private int noteN1;

    private int noteN2;

    private List<Integer> note2s;

    private String code;

    public int getNote2() {
        return note2;
    }

    public void setNote2(int note2) {
        this.note2 = note2;
    }

    public int getNote1() {
        return note1;
    }

    public void setNote1(int note1) {
        this.note1 = note1;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getNoteN1() {
        return noteN1;
    }

    public void setNoteN1(int noteN1) {
        this.noteN1 = noteN1;
    }

    public int getNoteN2() {
        return noteN2;
    }

    public void setNoteN2(int noteN2) {
        this.noteN2 = noteN2;
    }

    public List<Integer> getNote1s() {
        return note1s;
    }

    public void setNote1s(List<Integer> note1s) {
        this.note1s = note1s;
    }

    public List<Integer> getNote2s() {
        return note2s;
    }

    public void setNote2s(List<Integer> note2s) {
        this.note2s = note2s;
    }
}
