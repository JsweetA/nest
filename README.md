## Introduce

一个登录校验的后端采用的是 *typeorm*

## 已学习内容
### 1.操作表
+ Respository：用于操作单表，指向一个表，对当前表进行增删改查操作
> api链接：https://www.typeorm.org/repository-api
+ Entity Manager：可以操作多个表，用于多表查询操作等。
> api链接：https://www.typeorm.org/entity-manager-api
### 2.拦截器

![img](Interceptors_1.png)

拦截器具有一系列有用的功能，这些功能受**面向切面编程（AOP）**技术的启发。它们可以：

+ 在函数执行之前/之后绑定**额外的逻辑**
+ 转换从函数返回的结果
+ **转换**从函数抛出的异常
+ 扩展基本函数行为
+ 根据所选条件完全重写函数 (例如, 缓存目的)

## 待研究内容

- [+] 拦截器
- [+] 异常处理
- [+] Http异常
- [ ] 管道
> nestjs链接：https://docs.nestjs.cn/9/pipes

