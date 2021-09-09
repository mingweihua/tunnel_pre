$.ajax({
    //请求方式为get
    async: false,
    type: "GET",
    url: "json/MYS1out2222.json",
    //请求成功完成后要执行的方法
    success: function (data) {
        console.log(data);

        for (let i = 0; i < 5; i++) {
            console.log(i);
        }

    }
})
