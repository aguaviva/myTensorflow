class FullyConnectedLayer
{
    constructor(weights, bias)
    {
        this.name ="FullyConnectedLayer";
        this.weights = weights
        this.bias = bias
    }

    forwardPass(input)
    {
        this.input = input;
        var out = [[ AddMat([this.bias], MulMat(input[0][0], this.weights[0][0])) ]];
        return out;
    }

    backPropagation(layerDerivative)
    {
        var t = TransposeMat(this.weights[0][0])
        return [[MulMat(layerDerivative[0][0], t)]];
    }
   
    computeDeltas(layerDerivative)
    {
        // for training
        var weightDeltas = MulMat(TransposeMat(this.input[0][0]), layerDerivative[0][0]);
        var biasDeltas   = layerDerivative[0][0];

        // batching
        if (this.weightDeltas==undefined)
        {
            this.weightDeltas = weightDeltas;
            this.biasDeltas   = biasDeltas;
        }
        else
        {
            this.weightDeltas = AddMat(this.weightDeltas, weightDeltas);
            this.biasDeltas   = AddMat(this.biasDeltas, biasDeltas);
        }
        
    }

    train(LearningRate)
    {
        this.weights = [[SubMat( this.weights[0][0], MulKMat(LearningRate,this.weightDeltas))]];
        this.bias    = SubMat( [this.bias],    MulKMat(LearningRate,this.biasDeltas))[0];
        
        this.weightDeltas = undefined;
        this.biasDeltas = undefined;
    }
}
