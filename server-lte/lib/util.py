def rowToObj(row, attrs):
	i = 0
	obj = {}
	for attr in attrs:
		obj[attr] = row[i]
		i += 1
	return obj

def toObjArray(rows, attrs):
	array = []
	for row in rows:
		array.append(rowToObj(row, attrs))
	return array