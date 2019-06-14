// 1749 baseline
// 2027 with new MatZero-loop in mulmat
// 2215 with new MatZero-fill in mulmat

function assert(condition, message) 
{
    if (!condition) 
    {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") 
        {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

function RandomVec(neurons)
{
    var L = []
    for(var i=0;i<neurons;i++)
        L[i]= 2*Math.random()-1;
    return L
}

function RandomMat(neurons, inp)
{
    var L = []
    for(var i=0;i<neurons;i++)
    {
        L[i] = [];
        for(var j=0;j<inp;j++)
        {
            L[i].push(2*Math.random()-1);
        }
    }
    return L;
}

function TensorRandom(dimZ, dimW, dimY, dimX)
{
    var out = [];
    for(var z=0;z<dimZ;z++)
    {        
        out[z] = []
        for(var w=0;w<dimW;w++)
        {        
            out[z][w] = []
            
            for(var y=0;y<dimY;y++)
            {
                out[z][w][y] = []
                for(var x=0;x<dimX;x++)
                {                                       
                    out[z][w][y][x] = 2*Math.random()-1;
                }
            }                        
        }
    }
    
    return out;                
}

function GetDimensions(m)
{
    var o = []
    
    for(;;)
    {
        if (Array.isArray(m)==false)
            break;
            
        o.push(m.length);
        m=m[0];
    }
    return o;
}

function GetArrayDimensions(m)
{
    var mm=m;
    for(var i=0;i<5;i++)
    {
        if (Array.isArray(mm)==false) 
            return i;
        mm=mm[0]
    }
    
}

function PrintMat2D(prefix, m)
{
    var str = "";
    for(var j=0;j<m.length;j++)
    {
        str += prefix+"[";
        for(var i=0;i<m[j].length;i++)
        {          
            var v = m[j][i].toFixed(10); 
            if (v>=0)
             str +=" " + v
            else 
                str += v;
            if (i<m[j].length-1)
                str += ", "
            
        }
        str += "]\n";
    }
    str += "";

    return str;
}

function PrintMat(prefix, mm)
{
    var d = GetDimensions(mm);
    var dim = d.length
    
    if (dim==2)
    {
        return PrintMat2D(prefix, mm)
    }
    else if (dim==3)
    {
        var str = ""
        for(var k=0; k<d[0];k++)
        {
            str += prefix+ PrintMat(mm[k])
        }
    }    
    return str;
}

function GetZeroedVector(n)
{
    var O = [];
    
    for(var j=0;j<n;j++)
        O[j] = 0;
        
    return O;
}

function MatZero(dimY, dimX)
{
    var O = []   
    for(var y=0;y<dimY;y++)
    {
        O[y] = []
        for(var x=0;x<dimX;x++)
        {                                       
            O[y][x] = 0;
        }
    }               

    return O;
 }


function TensorZero(dimZ, dimW, dimY, dimX)
{
    var out = [];
    for(var z=0;z<dimZ;z++)
    {        
        out[z] = []
        for(var w=0;w<dimW;w++)
        {        
            out[z][w] = []
            
            for(var y=0;y<dimY;y++)
            {
                out[z][w][y] = []
                for(var x=0;x<dimX;x++)
                {                                       
                    out[z][w][y][x] = 0;
                }
            }                        
        }
    }
    
    return out;                
}

function RectangularMat(dimX, dimY)
{
    var O = [];
    for(var i=0;i<dimY;i++)
    {
        O[i] = Array(dimX).fill(0);
    }
    return O;
}

function MatId(dimX, value)
{
    var v = RectangularMat(dimX, dimX, value);
    
    for(var i=0;i<dimY;i++)
    {
        v[i][i]=value;
    }    
}

function MulMat(m1, m2)
{
    assert(m1[0].length == m2.length);

    var O = MatZero(m1.length, m2[0].length);

    for(var j=0;j<m1.length;j++)
    {
        for(var i=0;i<m2[0].length;i++)
        {
            for(var k=0;k<m1[0].length;k++)
            {                
                O[j][i] += (m1[j][k] * m2[k][i]);
            }
        }
    }
    return O;
}

function CheckMat(m, msg)
{
    var l = m[0].length;
    for(var j=0;j<m.length;j++)
    {
        if (l!=m[j].length)
            alert("caca");
            
        for(var i=0;i<m[j].length;i++)
        {
            if (typeof m[j][i] !="number")
            {
                console.log(msg+"\n "+  m[j][i]);        
                debugger;
            }
        }        
    }
}

function TransposeMat(m)
{
    var O = MatZero(m[0].length, m.length);
    for(var j=0;j<m.length;j++)
    {
        for(var i=0;i<m[0].length;i++)
        {
            O[i][j] = m[j][i];
        }
    }
    return O;
}

function AddMat(m1, m2)
{
    assert(m1.length == m2.length);
    assert(m1[0].length == m1[0].length);

    var O = MatZero(m1.length, m1[0].length);
    for(var j=0;j<m1.length;j++)
    {
        for(var i=0;i<m1[0].length;i++)
        {
            O[j][i] = m1[j][i] + m2[j][i];
        }
    }
    
    return O;
}

function MulKMat(k, m)
{
    var O = MatZero(m.length, m[0].length);
    for(var j=0;j<m.length;j++)
    {
        for(var i=0;i<m[0].length;i++)
        {
            O[j][i] = m[j][i] * k;
        }
    }
    return O;
}

function SubMat(m1, m2)
{
    assert(m1.length == m2.length);
    assert(m1[0].length == m2[0].length);

    var O = MatZero(m1.length, m1[0].length);
    for(var j=0;j<m1.length;j++)
    {
        for(var i=0;i<m1[0].length;i++)
        {
            O[j][i] = m1[j][i] - m2[j][i];
        }
    }
    return O;
}

function Square(v)
{
    return MulMat(v, TransposeMat(v))
}

function ConvertMat(m, x,y)
{
    var O = [];
    var n = 0;
    
    for(var j=0;j<y;j++)
        O[j]=[];
    
    for(var j=0;j<m.length;j++)
    {        
        for(var i=0;i<m[0].length;i++)
        {    
            O[Math.floor(n/x)][n % x] = m[j][i];
            n++;
        }    
    }
    
    return O;
}


