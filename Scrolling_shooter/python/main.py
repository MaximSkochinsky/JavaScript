input_string = input().rstrip()
variants = {}
nums = [int(n) for n in input_string]
nums.reverse()
length = len(nums)
for i in range(length):
    for j in range(i + 1, length):
        if nums[i] > nums[j]:
            variants[i] = j
            break

list_variants = list(variants.items())
if list_variants:
    list_variants.sort(key=lambda k: k[1])
    i = list_variants[0][1]
    j_variants = [n[0] for n in list_variants if n[1] == i]
    elements = [nums[n] for n in j_variants]
    j = j_variants[elements.index(min(elements))]
    
    nums[i], nums[j] = nums[j], nums[i]
    s = nums[0:i]
    s.sort(reverse=True)
    nums[0:i] = s
    nums.reverse()
    
    nums = [str(n) for n in nums]
    answer = ''.join(nums)
    print(answer)
else:
    print('-1')