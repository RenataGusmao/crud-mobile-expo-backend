import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const API_URL = 'https://gerenciador-de-tarefas-1-w2dz.onrender.com';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [status, setStatus] = useState('');
  const [categoria, setCategoria] = useState('');
  const [idEditando, setIdEditando] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    buscarTarefas();
  }, []);

  async function buscarTarefas() {
    try {
      setCarregando(true);
      const resposta = await fetch(`${API_URL}/tasks`);
      const dados = await resposta.json();
      setTarefas(dados);
    } catch (erro) {
      Alert.alert('Erro', 'Nao foi possivel buscar as tarefas.');
    } finally {
      setCarregando(false);
    }
  }

  async function salvarTarefa() {
    if (!titulo) {
      Alert.alert('Atencao', 'Digite o titulo da tarefa.');
      return;
    }

    const tarefa = {
      title: titulo,
      status: status,
      category: categoria
    };

    try {
      if (idEditando) {
        await fetch(`${API_URL}/tasks/${idEditando}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarefa)
        });
      } else {
        await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarefa)
        });
      }

      limparFormulario();
      buscarTarefas();
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possivel salvar a tarefa.');
    }
  }

  function editarTarefa(tarefa) {
    setIdEditando(tarefa._id);
    setTitulo(tarefa.title || '');
    setStatus(tarefa.status || '');
    setCategoria(tarefa.category || '');
  }

  async function excluirTarefa(id) {
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });

      buscarTarefas();
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possivel excluir a tarefa.');
    }
  }

  function limparFormulario() {
    setIdEditando(null);
    setTitulo('');
    setStatus('');
    setCategoria('');
  }

  return (
    <SafeAreaView style={styles.container}>
      {carregando ? (
        <View style={styles.carregando}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.textoCarregando}>Carregando tarefas...</Text>
        </View>
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.lista}
          ListHeaderComponent={
            <View>
              <View style={styles.cabecalho}>
                <Text style={styles.titulo}>Gerenciador de Tarefas</Text>
                <Text style={styles.descricao}>
                  Cadastre, edite e acompanhe suas tarefas.
                </Text>
              </View>

              <View style={styles.formulario}>
                <Text style={styles.tituloFormulario}>
                  {idEditando ? 'Editar tarefa' : 'Nova tarefa'}
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Titulo"
                  placeholderTextColor="#8a94a6"
                  value={titulo}
                  onChangeText={setTitulo}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Status"
                  placeholderTextColor="#8a94a6"
                  value={status}
                  onChangeText={setStatus}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Categoria"
                  placeholderTextColor="#8a94a6"
                  value={categoria}
                  onChangeText={setCategoria}
                />

                <TouchableOpacity style={styles.botaoSalvar} onPress={salvarTarefa}>
                  <Text style={styles.textoBotaoPrincipal}>
                    {idEditando ? 'Atualizar tarefa' : 'Cadastrar tarefa'}
                  </Text>
                </TouchableOpacity>

                {idEditando && (
                  <TouchableOpacity style={styles.botaoCancelar} onPress={limparFormulario}>
                    <Text style={styles.textoCancelar}>Cancelar edição</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.linhaTituloLista}>
                <Text style={styles.subtitulo}>Tarefas cadastradas</Text>
                <Text style={styles.contador}>{tarefas.length}</Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.vazio}>
              <Text style={styles.tituloVazio}>Nenhuma tarefa cadastrada</Text>
              <Text style={styles.textoVazio}>
                Preencha os campos acima para criar a primeira tarefa.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.topoCard}>
                <Text style={styles.nomeTarefa}>{item.title || 'Sem titulo'}</Text>
                <Text style={styles.status}>{item.status || 'Sem status'}</Text>
              </View>

              <Text style={styles.categoria}>
                Categoria: {item.category || 'Sem categoria'}
              </Text>

              <View style={styles.botoes}>
                <TouchableOpacity
                  style={styles.botaoEditar}
                  onPress={() => editarTarefa(item)}
                >
                  <Text style={styles.textoBotao}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoExcluir}
                  onPress={() => excluirTarefa(item._id)}
                >
                  <Text style={styles.textoBotao}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f7'
  },
  lista: {
    padding: 18,
    paddingBottom: 30
  },
  cabecalho: {
    marginTop: 14,
    marginBottom: 18
  },
  titulo: {
    color: '#172033',
    fontSize: 28,
    fontWeight: 'bold'
  },
  descricao: {
    color: '#64748b',
    fontSize: 15,
    marginTop: 6
  },
  formulario: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3
  },
  tituloFormulario: {
    color: '#172033',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#d8dee9',
    borderRadius: 8,
    color: '#172033',
    backgroundColor: '#f8fafc',
    padding: 12,
    marginBottom: 10,
    fontSize: 15
  },
  botaoSalvar: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 13,
    alignItems: 'center',
    marginTop: 4
  },
  textoBotaoPrincipal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  },
  botaoCancelar: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 10
  },
  textoCancelar: {
    color: '#475569',
    fontWeight: 'bold'
  },
  linhaTituloLista: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  subtitulo: {
    color: '#172033',
    fontSize: 18,
    fontWeight: 'bold'
  },
  contador: {
    backgroundColor: '#dbeafe',
    borderRadius: 20,
    color: '#1d4ed8',
    fontWeight: 'bold',
    minWidth: 34,
    paddingHorizontal: 10,
    paddingVertical: 4,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb'
  },
  topoCard: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  nomeTarefa: {
    color: '#172033',
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10
  },
  status: {
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    color: '#047857',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  categoria: {
    color: '#64748b',
    fontSize: 14
  },
  botoes: {
    flexDirection: 'row',
    marginTop: 14
  },
  botaoEditar: {
    backgroundColor: '#172033',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: 8
  },
  botaoExcluir: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold'
  },
  carregando: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  textoCarregando: {
    color: '#64748b',
    marginTop: 10
  },
  vazio: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center'
  },
  tituloVazio: {
    color: '#172033',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textoVazio: {
    color: '#64748b',
    marginTop: 6,
    textAlign: 'center'
  }
});
