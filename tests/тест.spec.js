function greaterThanLessThan (a,b,c) {
  //write your code here! 
     if (a >= 0 || b >= 0 || c >= 0){
       return true
     }else if (a < 0 && b < 0 && c < 0 ){
       return false
     }else{
       return true
     }
  }
  console.log(greaterThanLessThan(Number(null), 0, 1))
