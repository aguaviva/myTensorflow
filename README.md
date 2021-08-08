# myTensorflow

Tensorflow in javascript, all written from first principles as an exercise to learn NN. 

All started with me one day writing [some basic NN code](https://github.com/aguaviva/ArtificialIntelligence)... Somehow I ended up writing a lib that generates the same results as tensorflow in the forward and in the backprop passes.

## Online demos

Note that using chrome is highly recommended!

- [MNIST non Conv](https://aguaviva.github.io/myTensorflow/MnistNonConv.html)
- [LeNet-5-like convolutional](https://aguaviva.github.io/myTensorflow/MnistConv.html) (very slow!!)

## Features

It supports the following layers:

-  NN
   - Convolutional 1D & 2D Layers  
   - Fully connected layer  
-  Activation layers
   -  Sigmoid
   -  Relu
-  Pool layers
   -  Max pool
   -  Average pool   
-  Regularization
   - Dropout 1D & 2D
-  Cost layers
   - Quadratic error
   - Cross entropy (needs arg max)
-  Misc 
   - flatten layer




