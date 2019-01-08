class SequenceRandom{
    public static randomSequence():Array<Array<number>>{
        var squence = [[0,1,2,3,4,5], [0,1,2,3,4,5]];
        squence = SequenceRandom.shuffter(squence);
        return(squence);
    }

    public static shuffter(squence:Array<Array<number>>){
        for(let i=squence.length-1; i>=0; i--){
            var ith_array:Array<number> = squence[i];

            for(let j_=ith_array.length-1; j_>=0; j_--){
                let j = Math.floor(Math.random() * (j_));
                let ith_array_first = ith_array[j_];
                let ith_array_second = ith_array[j];
                if(Math.random()>=0.5) {
                    ith_array[j] = ith_array_first;
                    ith_array[j_] = ith_array_second;
                }
            }
        }
        return squence;
    }

}