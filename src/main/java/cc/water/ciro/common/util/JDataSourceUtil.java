package cc.water.ciro.common.util;

/**
 * Created by Administrator on 2017/2/5.
 */

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRField;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * 此类自动将参数中值为null的数据转为“”
 *
 * @author lijf
 * @see
 */
public class JDataSourceUtil implements JRDataSource {
    private HashMap[] datasHm = null;

    private List<HashMap> datasList = null;

    private HashMap temp = null;

    private int loop = -1;

    // 打印多条数据
    public JDataSourceUtil(HashMap[] datasHm) {
        this.datasHm = datasHm;
    }

    // 打印多条数据
    public JDataSourceUtil(List<HashMap> datasList) {
        this.datasList = datasList;
    }

    /**
     * 打印一页，一条数据时，用此构造参数
     *
     * @param hm
     */
    public JDataSourceUtil(HashMap hm) {
        this.datasList = new ArrayList<HashMap>();
        datasList.add(hm);
    }

    public Object getFieldValue(JRField jRfield) throws JRException {
        if (datasHm != null) {
            temp = datasHm[loop];
        } else {
            temp = datasList.get(loop);
        }
        return temp.get(jRfield.getName()) == null ? "" : temp.get(jRfield
                .getName());//过滤null值
    }

    public boolean next() throws JRException {
        loop++;
        if (datasHm != null) {
            if (loop >= datasHm.length) {
                return false;
            } else {
                return true;
            }
        } else {
            if (loop >= datasList.size()) {
                return false;
            } else {
                return true;
            }

        }
    }
}
