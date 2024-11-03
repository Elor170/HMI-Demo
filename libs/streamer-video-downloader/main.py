import pafy
v = pafy.new("https://youtu.be/xp763iNB_MA?si=4C0K0IdSapeHKsim")
s = v.getbest()
print("Size is %s" % s.get_filesize())
filename = s.download()  # starts download
print(filename)