
//由于js小数计算的时候不能精确，所以换算成整数计算之后，再恢复成小数
function accAdd(num1, num2) { //精确相加
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (Math.round(num1 * baseNum) + Math.round(num2 * baseNum)) / baseNum;
}

function accMultiply(num1, num2) {//精确相乘
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (Math.round(num1 * baseNum) * Math.round(num2 * baseNum)) / baseNum / baseNum;
  // Math.round四舍五入
}

function accSubtract(num1, num2) {//精确相减
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (Math.round(num1 * baseNum) - Math.round(num2 * baseNum)) / baseNum;
}


export {
  accAdd,
  accMultiply,
  accSubtract
}