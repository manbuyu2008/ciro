    @RequestMapping(value = "report.vm", method = RequestMethod.GET)
    public String report(Model model) {
        UserQuery userQuery = new UserQuery();
        List<User> userList = userService.findList(userQuery);
        // 报表数据源
        JRDataSource jrDataSource = new JRBeanCollectionDataSource(userList);
        // 动态指定报表模板url
        model.addAttribute("url", "/report/MvcIReportExample2.jasper");
        model.addAttribute("format", "pdf"); // 报表格式
        model.addAttribute("jrMainDataSource", jrDataSource);
        model.addAttribute("personName", "李丹丹");
        return "reportView"; // 对应jasper-views.xml中的bean id
    }

