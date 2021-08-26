class FullyConnectedLayer
{
    constructor(weights, bias)
    {
        this.bias = bias
        this.weights = weights
        this.name ="Dense";
        this.info = this.weights[0][0].length + " : " + this.weights[0][0][0].length;
		this.paramCount =  (this.weights[0][0].length * this.weights[0][0][0].length) + this.bias.length;
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
   
    computeGradients(layerDerivative)
    {
        // for training
        var weightsGradients = MulMat(TransposeMat(this.input[0][0]), layerDerivative[0][0]);
        var biasGradients    = layerDerivative[0][0];

        // batching
        if (this.weightsGradients==undefined)
        {
            this.weightsGradients = weightsGradients;
            this.biasGradients   = biasGradients;
        }
        else
        {
            this.weightsGradients = AddMat(this.weightsGradients, weightsGradients);
            this.biasGradients   = AddMat(this.biasGradients, biasGradients);
        }
        
    }

    train(LearningRate)
    {
        this.weights = [[SubMat( this.weights[0][0], MulKMat(LearningRate,this.weightsGradients))]];
        this.bias    = SubMat( [this.bias],    MulKMat(LearningRate,this.biasGradients))[0];
        
        this.weightsGradients = undefined;
        this.biasGradients = undefined;
    }
}
