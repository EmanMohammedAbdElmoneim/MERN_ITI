function totalFun()
{
    this.total=0;
    this.arr=[];
    this.add=function (x)
    {
        this.arr.push(x);
        this.total+=x;
    }
}

module.exports=totalFun;