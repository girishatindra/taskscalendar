import re

    
def main():
    if(read_progress()):
        write_progress(read_progress())
    else:
        return None


def read_progress():
    with open('README.md','r') as f:
        content = f.read()
        #print(content)
        total = re.findall(r'- \[(x| )\] (.+)',content)
        done = re.findall(r'- \[x\] .+',content)
        #print(len(total), len(done))
        #print((len(done) / len(total) )*100)
        try:
            n = round((len(done) / len(total) )*100)
        except ZeroDivisionError:
            return None
        else:
            new_content = re.sub(r'!\[Progress Bar\]\(https:\/\/progress-bar\.xyz\/\d+\/[^)]+\)',f"![Progress Bar](https://progress-bar.xyz/{n}/?title=completed&style=for-the-badge)",content)
    return new_content


def write_progress(content):
    with open('README.md','w') as f:
        f.write(content)

if __name__ == '__main__':
    main()