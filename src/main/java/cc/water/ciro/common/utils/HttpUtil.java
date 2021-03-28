package cc.water.ciro.common.utils;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.List;

//import java.security.cert.CertificateException;
//import java.security.cert.X509Certificate;

public class HttpUtil {
	public static HttpClient httpClient=new DefaultHttpClient();
	
	public  static final String BASE_URL="";
	
	//get方式请求
	public   static String getRequest(String url) throws Exception, IOException{		
		HttpGet httpGet=new HttpGet(url);
	HttpResponse httpResponse=httpClient.execute(httpGet);
	if(httpResponse.getStatusLine().getStatusCode()==200){
		String result=EntityUtils.toString(httpResponse.getEntity());
		return result;
	}
	return null;
	}
	
	//post方式请求
	public  static String postRequest(String url,List<NameValuePair> list) throws Exception {
		HttpPost httpPost=new HttpPost(url);
	
		httpPost.setEntity(new UrlEncodedFormEntity(list,"UTF-8"));
		HttpResponse httpResponse=httpClient.execute(httpPost);
		if(httpResponse.getStatusLine().getStatusCode()==200){
			String result=EntityUtils.toString(httpResponse.getEntity());
			return result;
		}
		return null;
	}
	

		
	//获取https
//	public static String createSSLClientDefault(String url,List<NameValuePair> params) throws Exception{
//
//		             SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
//		                 //信任所有
//		                 public boolean isTrusted(X509Certificate[] chain,
//		                                 String authType) throws CertificateException {
//		                     return true;
//		                 }
//		             }).build();
//		             SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext);
//
//		             HttpPost httpPost=new HttpPost(url);
//		             httpPost.setEntity(new UrlEncodedFormEntity(params));
//
//		             CloseableHttpResponse response = HttpClients.custom().setSSLSocketFactory(sslsf).build().execute(httpPost);
//		             System.out.println(response.toString());
//
//		             HttpEntity entity = response.getEntity();
//		             String jsonStr =null;
//		             jsonStr = EntityUtils.toString(entity, "utf-8");
//		        //  httpPost.abort();
//		         return  jsonStr;
//		}
	

}
