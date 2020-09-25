import stanza
import pandas as pd
import numpy
from stanza.server import CoreNLPClient

# stanza.download('en')
cols = ["listing_id", "reviewer_id", "comments"]
df = pd.read_csv("AirBnbDataset/reviews.csv", usecols=cols)

nlp = stanza.Pipeline('en', tokenize_no_ssplit=True)
l = []
j=0
for com in df["comments"]:
    doc = nlp(com)
    for i, sentence in enumerate(doc.sentences):
        l.append(sentence.sentiment)
    print(j)
    j=j+1

df["comments"] = l

df.reset_index().pivot_table(index="reviewer_id", columns="listing_id", values="comments")

def matrix_factorization(R, P, Q, K, steps=5000, alpha=0.0002, beta=0.02):

    Q = Q.T

    for step in range(steps):
        for i in range(len(R)):
            for j in range(len(R[i])):
                if R[i][j] > 0:
                    eij = R[i][j] - numpy.dot(P[i,:],Q[:,j])

                    for k in range(K):
                        P[i][k] = P[i][k] + alpha * (2 * eij * Q[k][j] - beta * P[i][k])
                        Q[k][j] = Q[k][j] + alpha * (2 * eij * P[i][k] - beta * Q[k][j])

        eR = numpy.dot(P,Q)

        e = 0

        for i in range(len(R)):

            for j in range(len(R[i])):

                if R[i][j] > 0:

                    e = e + pow(R[i][j] - numpy.dot(P[i,:],Q[:,j]), 2)

                    for k in range(K):

                        e = e + (beta/2) * (pow(P[i][k],2) + pow(Q[k][j],2))
        if e < 0.001:

            break

    return P, Q.T