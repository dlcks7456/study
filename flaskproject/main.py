from flask import Flask, request, make_response, render_template
import datetime
import database

app = Flask(__name__)

now = datetime.datetime.now()
today = '%s년 %s월 %s일'%(now.year, now.month, now.day)

@app.route('/')
def home():
    # main page
    return render_template('home.html')

@app.route('/assessment')
def assessment():
    # 평가 페이지
    return render_template('assessment.html', today=today)

@app.route('/result', methods=['POST','GET'])
def result():
    # 모든 결과 데이터
    if request.method == 'POST' :
        result = request.form
        database.save(result)
        return render_template('result.html', result=result)

@app.route('/datacheck')
def datacheck():
    # data 확인 페이지
    datas = database.load_list()
    return render_template('datacheck.html', datas=datas)

@app.route('/listcheck/<int:index>')
def listcheck(index):
    # list 확인 페이지
    datas = database.load_data(index)
    return render_template('listcheck.html', datas=datas)

if __name__ == '__main__':

    app.run()