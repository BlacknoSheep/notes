# 一、基础知识

## 1. `torch.Tensor` 类

`torch.Tensor` 类的对象是一个包含单一类型数据的**矩阵**，称为**张量（tensor）**。

| 主要属性和方法  | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| `dtype`         | tensor包含的数据的类型，`torch.float32`(`torch.float`), `torch.int32`(`torch.int`) |
| `requires_grad` | 是否计算梯度。当为 `false` 时，**不会中断反向传播**。通过 `torch.nn.xxx` 创建的参数的 `requires_grad==True`。 |
| `is_leaf`       | 是否为叶节点，只有叶节点会累积梯度。一般不需要对其进行操作。一般模型的输入和可训练参数都是叶节点。 |
|                 |                                                              |
| `clone()`       | 返回一个与原tensor完全相同的tensor，会开辟新的内存，但仍位于计算图中。<br/>`grad_fn=<CloneBackward0>`。 |
| `detach()`      | 返回值与原tensor共享内存，新tensor会脱离原计算图。<br/>其`grad_fn==None`, `requires_grad=false`, `is_leaf=true`。 |
| `item()`        | 返回一个Python number，值和原tensor相同（原tensor必须只包含一个值，可以是多维的）。 |

### 1.1 `torch.Tensor()` 和 `torch.tensor` 的区别

`torch.Tensor()` 是 `torch.Tensor` 类的构造函数，是 `torch.FloatTensor` 的别名，其返回值包含的数据类型为 `torch.float32` 。

`torch.tensor()` 为一个函数，会拷贝参数的数据部分（这意味着始终会开辟新内存），返回值的数据类型与输入值有关。

## 2. 关于网络层参数

```python
fc = torch.nn.Linear(3,2)
type(fc.weight)  # torch.nn.parameter.Parameter
fc.weight.requires_grad  # True
fc.weight.is_leaf  # True

type(fc.weight.data)  # torch.Tensor
fc.weight.data.requires_grad  # False
fc.weight.data.is_leaf  # True
```

`fc.weight` 是一个 `fc.weight.data` 视图（view），二者共享内存。

```python
fc.weight[0][0] = 0  # 报错
fc.weight.data[0][0] = 0  # 修改成功
```

