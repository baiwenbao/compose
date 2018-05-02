class Spromise {
    constructor(resolve, reject) {
        this.callback = null;
        this.nextPromise = null;
        this.status = 'pedding';
        this.value = undefined;
        this.rejectMsg = undefined;
        try {
            resolve && resolve(v => this.onResolve(v));
        } catch (err) {
            this.onReject(err);
            reject && reject(err);
        }
    }

    onResolve(val) {
        this.status = 'resolved';
        this.value = val;
        if (!this.callback) return;
        setTimeout(() => {
            const callbackResult = this.callback(val);
            if (callbackResult instanceof Spromise) {
                callbackResult.then(res => {
                    this.nextPromise.onResolve(res);
                });
            } else {
                this.nextPromise.onResolve(callbackResult);
            }
        }, 0);
    }

    onReject(err) {
        this.status = 'rejected';
        this.rejectMsg = err;
    }
    
    then(fn) {
        this.callback = fn;
        return this.nextPromise = new Spromise();
    }
}
