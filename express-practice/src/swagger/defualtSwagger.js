const defaultSwagger ={
    openapi : "3.0.0",
    info : {
        version : "1.0.0",
        title : '스웨거 연습',
        description : "스웨거 연습용 페이지",
    },
    servers: [
        {
          url: "http://localhost:8000", // 요청 URL
        },
      ],
};


export default defaultSwagger;