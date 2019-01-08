var SequenceRandom = (function () {
    function SequenceRandom() {
    }
    SequenceRandom.randomSequence = function () {
        var squence = [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5]];
        squence = SequenceRandom.shuffter(squence);
        return (squence);
    };
    SequenceRandom.shuffter = function (squence) {
        for (var i = squence.length - 1; i >= 0; i--) {
            var ith_array = squence[i];
            for (var j_ = ith_array.length - 1; j_ >= 0; j_--) {
                var j = Math.floor(Math.random() * (j_));
                var ith_array_first = ith_array[j_];
                var ith_array_second = ith_array[j];
                if (Math.random() >= 0.5) {
                    ith_array[j] = ith_array_first;
                    ith_array[j_] = ith_array_second;
                }
            }
        }
        return squence;
    };
    return SequenceRandom;
}());
