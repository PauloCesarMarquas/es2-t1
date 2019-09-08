def toObjArray(tupl, attrs):
	array = []
	for row in tupl:
		i = 0
		item = {}
		for attr in attrs:
			item[attr] = row[i]
			i += 1
		array.append(item)
	return array