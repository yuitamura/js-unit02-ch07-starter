export default class {
  constructor(val, typeName, type) {
    this.val = val;
    this.typeName = typeName;
    this.type = type;
    this.result = {};
    this._errorResult = this._errorResult.bind(this);
  }
  _cannotEmpty() {
    return new Promise((resolve, reject) => {
      if (!!this.val) {
        resolve(this);
      } else {
        reject({
          message: this._errorResult(`${this.typeName}は必須です。` ) // message = ... のイメージ
        })
      }
    });
  }

  _errorResult(message) {
    if (message) {
      return Promise.resolve(); // _cannotEmptyと連動するのでここではthis不要
    } else {
      return Promise.reject({ // ifのreturnとは別
        success: false,
        type: this.type,
        message // 分割代入で省略。この関数宣言時点では中身がわからない、空にしておく
      })
    }
  }
}