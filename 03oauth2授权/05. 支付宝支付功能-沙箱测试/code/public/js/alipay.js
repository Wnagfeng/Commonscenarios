(() => {
  const init = () => {
    initEvent();
  }

  const initEvent = () => {
    document.querySelectorAll('.money-list-item').forEach(node => {
      node.addEventListener('click', onMoneyListClick)
    })
    payBtn.addEventListener('click', onPayBtnClick)
  }

  const onPayBtnClick = () => {
    /* TODOS 表单验证 你要做一下验证 如果没有选择就不跳转*/
    // 其实就是跳转到支付页面携带金额
    window.open(`/alipay/${inputNode.value}`);
  }

  const onMoneyListClick = function () {
    const money = this.innerHTML;
    inputNode.value = money;
  }

  init();
})()