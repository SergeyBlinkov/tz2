const  timeToMins = (time:string) => {
    let b = time.split(':');
    return +b[0]*60 + +b[1];
}

const timeFromMins = (mins:number) =>  {
    const z= (n:number) =>  (n<10? '0':'') + n
    let h = (+mins/60 | 0) % 24;
    let m = +mins % 60;
    return z(h) + ':' + z(m);
}


export const  addTimes =(t0:string, t1:string) =>  timeFromMins(timeToMins(t0) + timeToMins(t1));
